# File Organizer

A utility script that automatically organizes files by extension into subdirectories.

## Usage

```bash
python file_organizer.py [source_directory] [-o target_directory]
```

### Options

- `source` (optional): Directory containing files to organize (default: current directory)
- `-o`, `--output`: Target directory for organized files (default: `source/organized`)

### Example

```bash
# Organize files in current directory
python file_organizer.py

# Organize files in a specific directory
python file_organizer.py /path/to/files

# Organize with custom output directory
python file_organizer.py /path/to/files -o /path/to/organized
```

## How It Works

The script scans all files in the source directory and moves them into subdirectories named after their file extensions (e.g., `images/`, `documents/`, `code/`). Files without extensions are placed in an `others/` directory.

## Requirements

- Python 3.6+

## Example Output

```
File organization complete!
Total files processed: 42

By extension:
  .py: 15
  .js: 8
  .html: 5
  .txt: 7
  .png: 6
  .jpg: 4
  others: 3

Created directories:
  organized/.py
  organized/.js
  organized/.html
  organized/.txt
  organized/.png
  organized/.jpg
  organized/others
```
# deepesh213
