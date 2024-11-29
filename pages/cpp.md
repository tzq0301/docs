# C++

* [C++ Insights](https://cppinsights.io/)
* [Compiler Explorer](https://godbolt.org/)
* [Makefiles, autotools & CMake](https://indico.cern.ch/event/1127483/attachments/2387906/4081279/makefile.pdf)
* [How to Write C++ Code | ClickHouse Docs](https://clickhouse.com/docs/en/development/style)
* [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)
* [C++ docs | Microsoft](https://learn.microsoft.com/en-us/cpp/cpp/?view=msvc-170)

## 堆 / 优先队列

```cpp
#include <iostream>
#include <queue>
#include <vector>

int main() {
    const auto data = {3, 1, 4, 1, 5, 9, 2, 6};

    std::priority_queue<int> max_heap{data.begin(), data.end()};

    while (!max_heap.empty()) {
        std::cout << max_heap.top() << " ";
        max_heap.pop();
    }
    std::cout << std::endl;
    
    // 大根堆 9 6 5 4 3 2 1 1 

    std::priority_queue<int, std::vector<int>, std::greater<>> min_heap{data.begin(), data.end()};

    while (!min_heap.empty()) {
        std::cout << min_heap.top() << " ";
        min_heap.pop();
    }
    std::cout << std::endl;
    
    // 小根堆 1 1 2 3 4 5 6 9 
}
```

```cpp
#include <iostream>
#include <queue>
#include <vector>

class Element {
public:
    int val;

    explicit Element(int val_) : val(val_) {}

    auto operator>(const Element &another) const {
        return this->val > another.val;
    }
};

int main() {
    const std::initializer_list<Element> elements{Element{3}, Element{1}, Element{4}, Element{1}, Element{5}};

    std::priority_queue<Element, std::vector<Element>, std::greater<>> elements_min_heap{elements.begin(),
                                                                                         elements.end()};

    while (!elements_min_heap.empty()) {
        std::cout << elements_min_heap.top().val << " ";
        elements_min_heap.pop();
    }
    std::cout << std::endl;
}

// 1 1 3 4 5 
```

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
