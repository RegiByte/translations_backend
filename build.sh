rm -rf build

sucrase ./src -d ./build --transforms imports

mkdir -p build/resources/i18n

node ./combine_translations.js -d ./build/resources/i18n
