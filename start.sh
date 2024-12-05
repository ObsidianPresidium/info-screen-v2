#!/bin/bash

# if [[ -d ".svelte-kit/output" ]]; then
#     npm run preview
# else
#     npm run build
#     npm run preview
# fi

rm RUNNING
npm i
npm run build
touch RUNNING
npm run preview