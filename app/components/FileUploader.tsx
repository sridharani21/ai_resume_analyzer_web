import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/utils";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const maxFileSize = 20 * 1024 * 1024;

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0] || null;
            onFileSelect?.(file);
        },
        [onFileSelect]
    );

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDrop,
        multiple: false,
        accept: { "application/pdf": [".pdf"] },
        maxSize: maxFileSize,
    });

    const file = acceptedFiles[0] || null;

    return (
        <div
            {...getRootProps()}
            className="w-full gradient-border p-4 cursor-pointer flex flex-col items-center"
        >
            <input {...getInputProps()} />
            {file ? (
                <div className="uploader-selected-file flex items-center space-x-3">
                    <img src="/images/pdf.png" alt="pdf" className="size-10" />
                    <div>
                        <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                            {file.name}
                        </p>
                        <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
                    </div>
                    <button
                        type="button"
                        className="p-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            onFileSelect?.(null);
                        }}
                    >
                        <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <>
                    <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                        <img src="/icons/info.svg" alt="upload" className="w-16 h-16" />
                    </div>
                    <p className="text-lg text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and
                        drop
                    </p>
                    <p className="text-lg text-gray-500">
                        PDF (max {formatSize(maxFileSize)})
                    </p>
                </>
            )}
        </div>
    );
};

export default FileUploader;
