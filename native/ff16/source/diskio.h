/*-----------------------------------------------------------------------/
/  Low level disk interface modlue include file   (C)ChaN, 2025          /
/-----------------------------------------------------------------------*/

#ifndef _DISKIO_DEFINED
#define _DISKIO_DEFINED

#ifdef __cplusplus
extern "C" {
#endif

/* Status of Disk Functions */
typedef BYTE	DSTATUS;

/* Results of Disk Functions */
typedef enum {
	RES_OK = 0,		/* 0: Successful */
	RES_ERROR,		/* 1: R/W Error */
	RES_WRPRT,		/* 2: Write Protected */
	RES_NOTRDY,		/* 3: Not Ready */
	RES_PARERR		/* 4: Invalid Parameter */
} DRESULT;


/*---------------------------------------*/
/* Prototypes for disk control functions */

#if FF_MULTI_PARTITION
PARTITION VolToPart[FF_VOLUMES] = {
	{ 0, 0 },	/* "0:" defaults to auto-detecting PD#0 before fdisk() */
	{ 1, 0 },
	{ 1, 0 },
	{ 1, 0 }
};

void ffw_set_vol_to_part (BYTE vol, BYTE pd, BYTE pt) {
	if (vol < FF_VOLUMES) {
		VolToPart[vol].pd = pd;
		VolToPart[vol].pt = pt;
	}
}

void ffw_reset_vol_to_part (void) {
	UINT i;
	VolToPart[0].pd = 0;
	VolToPart[0].pt = 0;
	for (i = 1; i < FF_VOLUMES; i++) {
		VolToPart[i].pd = 1;
		VolToPart[i].pt = 0;
	}
}
#endif

static FSIZE_t ffw_make_fsize (DWORD low, DWORD high) {
#if FF_FS_EXFAT
	return ((FSIZE_t)high << 32) | low;
#else
	(void)high;
	return low;
#endif
}

static LBA_t ffw_make_lba (DWORD low, DWORD high) {
#if FF_LBA64
	return ((LBA_t)high << 32) | low;
#else
	(void)high;
	return low;
#endif
}

FRESULT ffw_f_lseek (FIL* fp, DWORD ofs_low, DWORD ofs_high) {
	return f_lseek(fp, ffw_make_fsize(ofs_low, ofs_high));
}

FRESULT ffw_f_expand (FIL* fp, DWORD fsz_low, DWORD fsz_high, BYTE opt) {
#if FF_USE_EXPAND && !FF_FS_READONLY
	return f_expand(fp, ffw_make_fsize(fsz_low, fsz_high), opt);
#else
	(void)fp;
	(void)fsz_low;
	(void)fsz_high;
	(void)opt;
	return FR_INVALID_PARAMETER;
#endif
}

DWORD ffw_f_tell_low (FIL* fp) { return (DWORD)f_tell(fp); }
DWORD ffw_f_tell_high (FIL* fp) {
#if FF_FS_EXFAT
	return (DWORD)(f_tell(fp) >> 32);
#else
	(void)fp;
	return 0;
#endif
}
DWORD ffw_f_size_low (FIL* fp) { return (DWORD)f_size(fp); }
DWORD ffw_f_size_high (FIL* fp) {
#if FF_FS_EXFAT
	return (DWORD)(f_size(fp) >> 32);
#else
	(void)fp;
	return 0;
#endif
}

FRESULT ffw_f_fdisk (BYTE pdrv, const DWORD ptbl_low[], const DWORD ptbl_high[], void* work) {
	LBA_t ptbl[5];
	UINT i;
	for (i = 0; i < 5; i++) {
		ptbl[i] = ffw_make_lba(ptbl_low[i], ptbl_high[i]);
	}
	return f_fdisk(pdrv, ptbl, work);
}

UINT sizeof_FATFS (void) { return sizeof(FATFS); }
UINT sizeof_FIL (void) { return sizeof(FIL); }
UINT sizeof_DIR (void) { return sizeof(DIR); }
UINT sizeof_FILINFO (void) { return sizeof(FILINFO); }
UINT offset_FATFS_csize (void) { return (UINT)((BYTE*)&(((FATFS*)0)->csize) - (BYTE*)0); }
UINT offset_FILINFO_fattrib (void) { return (UINT)((BYTE*)&(((FILINFO*)0)->fattrib) - (BYTE*)0); }
UINT offset_FILINFO_altname (void) {
#if FF_USE_LFN
	return (UINT)((BYTE*)&(((FILINFO*)0)->altname) - (BYTE*)0);
#else
	return 0;
#endif
}
UINT offset_FILINFO_fname (void) { return (UINT)((BYTE*)&(((FILINFO*)0)->fname) - (BYTE*)0); }
UINT sizeof_TCHAR (void) { return sizeof(TCHAR); }

__attribute__((import_module("env"), import_name("disk_initialize")))
DSTATUS disk_initialize (BYTE pdrv);

__attribute__((import_module("env"), import_name("disk_status")))
DSTATUS disk_status (BYTE pdrv);

__attribute__((import_module("env"), import_name("ffw_disk_read")))
DRESULT ffw_disk_read (BYTE pdrv, BYTE* buff, DWORD sector_low, DWORD sector_high, UINT count);

DRESULT disk_read (BYTE pdrv, BYTE* buff, LBA_t sector, UINT count) {
	return ffw_disk_read(pdrv, buff, (DWORD)sector,
#if FF_LBA64
		(DWORD)(sector >> 32),
#else
		0,
#endif
		count);
}

__attribute__((import_module("env"), import_name("ffw_disk_write")))
DRESULT ffw_disk_write (BYTE pdrv, const BYTE* buff, DWORD sector_low, DWORD sector_high, UINT count);

DRESULT disk_write (BYTE pdrv, const BYTE* buff, LBA_t sector, UINT count) {
	return ffw_disk_write(pdrv, buff, (DWORD)sector,
#if FF_LBA64
		(DWORD)(sector >> 32),
#else
		0,
#endif
		count);
}

__attribute__((import_module("env"), import_name("disk_ioctl")))
DRESULT disk_ioctl (BYTE pdrv, BYTE cmd, void* buff);


/* Disk Status Bits (DSTATUS) */

#define STA_NOINIT		0x01	/* Drive not initialized */
#define STA_NODISK		0x02	/* No medium in the drive */
#define STA_PROTECT		0x04	/* Write protected */


/* Command code for disk_ioctrl fucntion */

/* Generic command (Used by FatFs) */
#define CTRL_SYNC			0	/* Complete pending write process (needed at FF_FS_READONLY == 0) */
#define GET_SECTOR_COUNT	1	/* Get media size (needed at FF_USE_MKFS == 1) */
#define GET_SECTOR_SIZE		2	/* Get sector size (needed at FF_MAX_SS != FF_MIN_SS) */
#define GET_BLOCK_SIZE		3	/* Get erase block size (needed at FF_USE_MKFS == 1) */
#define CTRL_TRIM			4	/* Inform device that the data on the block of sectors is no longer used (needed at FF_USE_TRIM == 1) */

/* Generic command (Not used by FatFs) */
#define CTRL_POWER			5	/* Get/Set power status */
#define CTRL_LOCK			6	/* Lock/Unlock media removal */
#define CTRL_EJECT			7	/* Eject media */
#define CTRL_FORMAT			8	/* Create physical format on the media */

/* MMC/SDC specific ioctl command (Not used by FatFs) */
#define MMC_GET_TYPE		10	/* Get card type */
#define MMC_GET_CSD			11	/* Get CSD */
#define MMC_GET_CID			12	/* Get CID */
#define MMC_GET_OCR			13	/* Get OCR */
#define MMC_GET_SDSTAT		14	/* Get SD status */
#define ISDIO_READ			55	/* Read data form SD iSDIO register */
#define ISDIO_WRITE			56	/* Write data to SD iSDIO register */
#define ISDIO_MRITE			57	/* Masked write data to SD iSDIO register */

/* ATA/CF specific ioctl command (Not used by FatFs) */
#define ATA_GET_REV			20	/* Get F/W revision */
#define ATA_GET_MODEL		21	/* Get model name */
#define ATA_GET_SN			22	/* Get serial number */

#ifdef __cplusplus
}
#endif

#endif
