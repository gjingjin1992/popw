#!/bin/sh
rm ./public_static/build_prod/client.js
rm ./public_static/build_prod/client.min.js
gulp bundle-production-client
/Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin/Contents/Home/bin/java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS   --js ./public_static/build_prod/client.js > ./public_static/build_prod/client.min.js
rm ./public_static/build_prod/client.js

rm ./public_static/build_prod/admin.js
rm ./public_static/build_prod/admin.min.js
gulp bundle-production-admin
/Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin/Contents/Home/bin/java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS   --js ./public_static/build_prod/admin.js > ./public_static/build_prod/admin.min.js
rm ./public_static/build_prod/admin.js

rm ./public_static/build_prod/next.js
/Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin/Contents/Home/bin/java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS   --js ./public_static/next.js > ./public_static/build_prod/next.min.js
rm ./public_static/build_prod/next.js
