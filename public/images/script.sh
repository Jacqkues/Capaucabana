
	#EXT=${FILE##*.} # file extension
	#QUALITY=85 # quality for the image
	# convert the image using cwebp and output a file with the extension replaced as .webp
	#cwebp -q $QUALITY "$FILE" -o "${FILE/%.$EXT/.webp}" &>/dev/null
#!/bin/bash

# Vérifie si un argument a été fourni
if [ -z "$1" ]; then
  echo "Veuillez fournir un répertoire en argument."
  exit 1
fi

# Vérifie si le répertoire existe
if [ ! -d "$1" ]; then
  echo "Le répertoire spécifié n'existe pas."
  exit 1
fi

# Convertit tous les fichiers du répertoire en images WebP
for file in "$1"/*; do
  if [ -f "$file" ]; then
    # Obtient le nom de fichier et l'extension
    filename=$(basename "$file")
    extension="${filename##*.}"

    # Vérifie si le fichier est une image
    if [[ "$extension" == "jpg" || "$extension" == "JPG" || "$extension" == "png" || "$extension" == "gif" ]]; then
      # Convertit l'image en WebP
      cwebp -q 85 "$file" -o "$1/${filename%.*}.webp"
    fi
  fi
done

echo "La conversion des images en WebP est terminée."