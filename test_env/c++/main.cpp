#include <iostream>
#include <map>
#include <iterator>
#include <string>

void printMap(const std::multimap<char, int>* map) {
  if(map->size() == 0) {
    std::cout << "MultiMap(0) {  }" << std::endl;
  }

  for (auto it = map -> begin(); it != map -> end(); ++it) {
    std::cout << it -> first << " : " << it -> second << std::endl; 
  }
}

int main() {
  std::multimap<char, int> map = {
    { 't', 1 },
    { 'h', 1 },
    { 'i', 2 },
    { 's', 3 },
    { 'i', 5 },
    { 's', 6 },
    { 'i', 8 }
  };

  std::multimap<char, int> map2 = {
    { 'T', 2 },
    { 'H', 2 },
    { 'I', 4 },
    { 'S', 6 },
    { 'I', 10 },
    { 'S', 12 },
    { 'I', 16 }
  };

  std::string emptyStr = "The map is ";

  if(!map.empty()) {
    emptyStr += "not ";
  }

  emptyStr += "empty";

  std::cout << emptyStr << std::endl;
  std::cout << "Both maps have " << map.size() << " entries" << std::endl;
  std::cout << "All 7 entries in both maps" << std::endl;

  printMap(&map);

  std::cout << std::endl;

  printMap(&map2);

  std::cout << "-------------------" << std::endl;

  std::cout << "Swapping with map2" << std::endl;

  map.swap(map2);

  std::cout << "All 7 entries in map: " << std::endl;
  printMap(&map);
  std::cout << std::endl;

  std::cout << "All 7 entries in map2: " << std::endl;
  printMap(&map2);
  std::cout << std::endl;

  std::cout << "Inserting the key-value pair { 'z', 9 }" << std::endl;
  map.insert({ 'z', 9 });

  std::cout << "Erasing all keys matching 's'" << std::endl;
  map.erase('s');

  std::cout << "New map: " << std::endl;

  printMap(&map);

  std::cout << "-------------------" << std::endl;

  std::cout << "Erasing all keys matching 'S'" << std::endl;
  map.erase('S');

  std::cout << "New map: " << std::endl;

  printMap(&map);

  std::cout << "-------------------" << std::endl;

  std::cout << "Clearing map" << std::endl;
  map.clear();

  std::cout << "New map: " << std::endl;
  
  printMap(&map);

  std::cout << "-------------------" << std::endl;
  
  return 0;
}
