#!/usr/bin/env python3
"""
File Organizer - Automatically organizes files by extension into subdirectories.
"""

import os
import shutil
from pathlib import Path


def organize_files(source_dir: str, target_dir: str = None) -> dict:
    """
    Organize files in source_dir by extension into subdirectories.
    
    Args:
        source_dir: Directory containing files to organize
        target_dir: Optional target directory (defaults to source_dir/organized)
        
    Returns:
        Dictionary with statistics about the organization
    """
    source_path = Path(source_dir)
    
    if target_dir is None:
        target_dir = source_path / "organized"
    
    # Create target directory
    target_path = Path(target_dir)
    target_path.mkdir(exist_ok=True)
    
    # Get all file extensions
    extensions = set()
    for file_path in source_path.rglob("*"):
        if file_path.is_file():
            ext = file_path.suffix.lower()
            if ext:
                extensions.add(ext)
    
    # Organize files
    stats = {
        "total_files": 0,
        "by_extension": {},
        "created_dirs": []
    }
    
    for file_path in source_path.rglob("*"):
        if file_path.is_file():
            ext = file_path.suffix.lower()
            if ext:
                stats["by_extension"][ext] = stats["by_extension"].get(ext, 0) + 1
            
            # Create extension directory
            ext_dir = target_path / ext
            ext_dir.mkdir(exist_ok=True)
            
            # Move file to appropriate directory
            dest_path = ext_dir / file_path.name
            shutil.move(str(file_path), str(dest_path))
            stats["total_files"] += 1
    
    stats["created_dirs"] = [str(ext_dir) for ext_dir in target_path.iterdir() if ext_dir.is_dir()]
    
    return stats


def main():
    """Main function to organize files in the current directory."""
    import argparse
    
    parser = argparse.ArgumentParser(description="Organize files by extension")
    parser.add_argument("source", nargs="?", default=".", help="Source directory (default: current directory)")
    parser.add_argument("-o", "--output", default=None, help="Target directory (default: source/organized)")
    
    args = parser.parse_args()
    
    stats = organize_files(args.source, args.output)
    
    print("File organization complete!")
    print(f"Total files processed: {stats['total_files']}")
    print("\nBy extension:")
    for ext, count in sorted(stats["by_extension"].items()):
        print(f"  .{ext}: {count}")
    print("\nCreated directories:")
    for dir_path in stats["created_dirs"]:
        print(f"  {dir_path}")


if __name__ == "__main__":
    main()