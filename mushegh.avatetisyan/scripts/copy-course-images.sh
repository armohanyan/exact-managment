#!/bin/bash
# Copy generated course images from Cursor assets into project
set -e
ASSETS="/home/dev/.cursor/projects/home-dev-mushegh/assets"
DEST="/home/dev/mushegh/images/courses"
for name in project-management-fundamentals agile-scrum-practice leadership-project-managers professional-career-coaching crisis-management-decision-making; do
  [ -f "$ASSETS/${name}.jpg" ] && cp "$ASSETS/${name}.jpg" "$DEST/" && echo "Copied ${name}.jpg"
done
echo "Done."
