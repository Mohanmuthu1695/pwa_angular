import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  form: FormGroup;
  selectedFile: File | null = null;
  uploadedImages: { description: string; imageUrl: string; status: string }[] = [];
  isLoading = false;
  isOnline = navigator.onLine; // Check the initial network status
  selectedImageUrl: string | null = null; // Variable to store the selected image URL

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      description: ['', Validators.required],
    });

    // Add an event listener to track changes in network status
    window.addEventListener('online', () => {
      this.isOnline = true;
    });
    this.selectedImageUrl = null;
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  ngOnInit(): void {
    // Load saved images from cache or IndexedDB
    this.loadSavedImagesFromCache();
  }

  onSubmit() {
    if (this.form.valid && this.selectedFile) {
      this.isLoading = true;

      // Save the image and description locally (cache or IndexedDB)
      this.saveImageLocally(this.form.value.description, this.selectedFile);

      // Simulate uploading
      setTimeout(() => {
        this.isLoading = false;

        if (this.selectedFile) {
          // Display the uploaded image
          const imageUrl = URL.createObjectURL(this.selectedFile);
          this.uploadedImages.push({
            description: this.form.value.description,
            imageUrl: imageUrl,
            status: this.isOnline ? 'Online' : 'Offline',
          });

          // Clear the form
          this.form.reset();
          this.selectedFile = null;
        }
      }, 2000);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Save the image and description locally (cache or IndexedDB)
  private saveImageLocally(description: string, file: File) {
    // Implement saving to cache or IndexedDB here
    // Example: this.saveImageToCache(description, file);
  }

  // Load saved images from cache or IndexedDB
  private async loadSavedImagesFromCache() {
    try {
      const cache = await caches.open('my-cache');
      const keys = await cache.keys();
      for (const key of keys) {
        if (key.url.startsWith('/images/')) {
          const response = await cache.match(key);
          if (response) {
            const data = await response.json();
            this.uploadedImages.push({
              description: data.description,
              imageUrl: data.imageUrl,
              status: this.isOnline ? 'Online' : 'Offline',
            });
          }
        }
      }
    } catch (error) {
      console.error('Error loading data from cache:', error);
    }
  }

  onImageClick(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }
}
