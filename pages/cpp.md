# C++

* [Makefiles, autotools & CMake](https://indico.cern.ch/event/1127483/attachments/2387906/4081279/makefile.pdf)
* [How to Write C++ Code | ClickHouse Docs](https://clickhouse.com/docs/en/development/style)
* [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)
* [C++ docs | Microsoft](https://learn.microsoft.com/en-us/cpp/cpp/?view=msvc-170)

## g++ 接收标准输入

```bash
g++ -x c++ -o version - <<EOF
#include <stdio.h>

#include "src/version.h"

int main() {
  printf(REDIS_VERSION);
}
EOF

./version
```

## CMake 使用 FetchContent

```cmake
cmake_minimum_required(VERSION 3.26)
project(Learning_CMake)

set(CMAKE_CXX_STANDARD 23)

include(FetchContent)

FetchContent_Declare(fmt
        GIT_REPOSITORY https://github.com/fmtlib/fmt.git)
FetchContent_MakeAvailable(fmt)

FetchContent_Declare(Boost
#        GIT_REPOSITORY https://github.com/boostorg/boost.git
        URL https://github.com/boostorg/boost/releases/download/boost-1.83.0/boost-1.83.0.tar.xz
        DOWNLOAD_EXTRACT_TIMESTAMP ON)
FetchContent_MakeAvailable(Boost)

add_executable(Learning_CMake main.cpp)
target_link_libraries(Learning_CMake PRIVATE fmt Boost::uuid Boost::lexical_cast)
```
