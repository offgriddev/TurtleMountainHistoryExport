#! /usr/local/bin/bash

IMAGE_URLS=$(cat location-list.dat)

PAGE=1
for IMAGE in ${IMAGE_URLS[*]}; do
  curl $IMAGE >> "PAGE_$PAGE.jpg"
  PAGE=$((PAGE + 1))
done
