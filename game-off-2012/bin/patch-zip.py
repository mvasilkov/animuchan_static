#!/usr/bin/python
from struct import unpack

MAGIC_META = 0x02014b50 # "PK\1\2"
MAGIC_FILE = 0x04034b50 # "PK\3\4"
MAGIC_DONE = 0x06054b50 # "PK\5\6"

def concat(*args):
    return "".join(args)

def patch(bytes):
    """Remove last modification from zip headers."""
    start = 0
    end = len(bytes)

    while start < end:
        # test magic
        (magic, ) = unpack("i", bytes[start:start + 4])
        if magic == MAGIC_DONE: break
        assert magic in (MAGIC_META, MAGIC_FILE)

        # local file header
        if magic == MAGIC_FILE:
            # patch last modification date and time
            # bytes[start + 10:start + 14] = "\0\0\0\0"
            bytes = concat(bytes[:start + 10], "\0\0\0\0", bytes[start + 14:])
            # extract offsets
            (size, ) = unpack("i", bytes[start + 18:start + 22])
            (name_len, meta_len) = unpack("hh", bytes[start + 26:start + 30])
            # print file name
            start += 30
            print "FILE", bytes[start:start + name_len]
            # goto next record
            start += size + name_len + meta_len

        # central directory file header
        else:
            # patch last modification date and time
            # bytes[start + 12:start + 16] = "\0\0\0\0"
            bytes = concat(bytes[:start + 12], "\0\0\0\0", bytes[start + 16:])
            # extract offsets
            # (size, ) = unpack("i", bytes[start + 20:start + 24])
            (name_len, meta_len, text_len) = unpack("hhh", bytes[start + 28:start + 34])
            # print file name
            start += 46
            print "META", bytes[start:start + name_len]
            # goto next record
            start += name_len + meta_len + text_len

    return bytes

if __name__ == "__main__":
    import sys

    if len(sys.argv) != 2:
        sys.exit("Usage: %s foo.zip" % sys.argv[0])

    filename = sys.argv[1]

    with open(filename, "rb") as f:
        bytes = f.read()

    with open("patched-" + filename, "wb") as f:
        f.write(patch(bytes))
