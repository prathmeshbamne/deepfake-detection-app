document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const uploadBox = document.getElementById('uploadBox');
    const browseBtn = document.getElementById('browseBtn');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const errorMessage = document.getElementById('errorMessage');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const fileDuration = document.getElementById('fileDuration');
    const filePreview = document.getElementById('filePreview');
    const removeBtn = document.getElementById('removeBtn');
    const continueBtn = document.getElementById('continueBtn');
    const uploadContent = document.getElementById('uploadContent');
    const uploadProgress = document.getElementById('uploadProgress');
    const uploadSuccess = document.getElementById('uploadSuccess');

    // Variables
    let selectedFile = null;
    let uploadInProgress = false;

    // Event Listeners
    browseBtn.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', handleFileSelect);

    uploadBox.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadBox.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        uploadBox.style.backgroundColor = 'rgba(67, 97, 238, 0.05)';
    });

    uploadBox.addEventListener('dragleave', function() {
        uploadBox.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--divider-color');
        uploadBox.style.backgroundColor = 'transparent';
    });

    uploadBox.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadBox.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--divider-color');
        uploadBox.style.backgroundColor = 'transparent';
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelect({ target: fileInput });
        }
    });

    uploadBtn.addEventListener('click', handleUpload);
    removeBtn.addEventListener('click', resetForm);
    continueBtn.addEventListener('click', function() {
        window.location.href = 'E:/web/result.html';
    });

    // Functions
    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Reset any previous state
        resetForm();
        hideError();

        // Validate file type
        const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
        if (!validTypes.includes(file.type)) {
            showError('Please upload a valid video file (MP4, MOV, or AVI)');
            return;
        }

        // Validate file size (300MB max)
        if (file.size > 300 * 1024 * 1024) {
            showError('File size exceeds the 300 MB limit');
            return;
        }

        // Store the selected file
        selectedFile = file;

        // Display file info
        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);

        // Create video element to get duration
        const video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = function() {
            window.URL.revokeObjectURL(video.src);

            // Validate duration (2 minutes max)
            if (video.duration > 120) {
                showError('Video duration exceeds the 2 minute limit');
                resetForm();
                return;
            }

            fileDuration.textContent = formatDuration(video.duration);

            // Create thumbnail preview
            createThumbnail(video);

            // Show upload progress section
            uploadContent.classList.add('hidden');
            uploadProgress.classList.remove('hidden');
        };

        video.onerror = function() {
            showError('Error reading video file');
            resetForm();
        };

        video.src = URL.createObjectURL(file);
    }

    function createThumbnail(video) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 160;
        canvas.height = 90;

        // Capture frame at 1 second
        video.currentTime = 1;

        video.onseeked = function() {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            filePreview.innerHTML = '';
            filePreview.appendChild(canvas);
        };
    }

    function handleUpload() {
        if (!selectedFile || uploadInProgress) return;

        uploadInProgress = true;
        uploadBtn.disabled = true;
        updateProgress(0);

        // Simulate upload progress (replace with actual AJAX upload)
        let progress = 0;
        const interval = setInterval(function() {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                uploadComplete();
            }
            updateProgress(progress);
        }, 300);
    }

    function updateProgress(progress) {
        progressBar.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '% uploaded';
    }

    function uploadComplete() {
        uploadInProgress = false;
        
        // Show success message
        uploadProgress.classList.add('hidden');
        uploadSuccess.classList.remove('hidden');
    }

    function resetForm() {
        if (uploadInProgress) return;

        fileInput.value = '';
        selectedFile = null;
        uploadBtn.disabled = false;
        uploadInProgress = false;
        
        uploadProgress.classList.add('hidden');
        uploadSuccess.classList.add('hidden');
        uploadContent.classList.remove('hidden');
        
        hideError();
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    function hideError() {
        errorMessage.classList.add('hidden');
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }
});