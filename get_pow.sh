#!/bin/sh

VERSION=0.3.2

case "$1" in
  help|usage|-h|--help)
    echo "$0 [version]"
    echo
    echo "  default version is $VERSION"
    ;;
  *)
    VERSION="${1:-$VERSION}"
    if [ -d "pow/$VERSION" ]; then
      echo "Already downloaded in pow/$VERSION"
      echo "Remove it first to force downloading again"
      exit
    fi
    mkdir -p pow
    cd pow
    curl -s http://get.pow.cx/versions/$VERSION.tar.gz | tar xzf -
    ;;
esac