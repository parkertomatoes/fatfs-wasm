#include "string.h"

void* memset(void* dst, int value, size_t count)
{
    char* s = dst;
    for (size_t i = 0; i < count; ++i)
        s[i] = (char)value;
    return dst;
}

int memcmp(const void *dst, const void *src, size_t count)
{
    const unsigned char *d = dst;
    const unsigned char *s = src;
    for (size_t i = 0; i < count; ++i)
    {
        const unsigned char result = *d++ - *s++;
        if (result)
            return result;
    }
    return 0;
}

void* memcpy (void *dst, const void *src, size_t n)
{
    void* result = dst;
    unsigned char* d = (unsigned char*)dst;
    unsigned char* s = (unsigned char*)src;
    for (size_t i = 0; i < n; ++i)
      *d++ = *s++;
    return result;
}

char* strchr(const char *str, int value)
{
    for (const char* c = str; *c; ++c)
    {
        if (*c == (char)value)
            return (char*)c;
    }
    return 0;
}

void* memchr(const void *str, int value, size_t count)
{
    const char* c = str;
    for (size_t i = 0; i < count; ++i, ++c)
    {
        if (*c == (char)value)
            return (void*)c;
    }
    return 0;
}