"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, AlertCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface CreateNFTFormProps {
  onUploadStart: () => void;
}

export function CreateNFTForm({ onUploadStart }: CreateNFTFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    royalty: "10",
    collection: "none",
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error("Please select an image for your NFT");
      return;
    }
    
    if (!formData.name) {
      toast.error("Please enter a name for your NFT");
      return;
    }
    
    if (!formData.price) {
      toast.error("Please enter a price for your NFT");
      return;
    }
    
    onUploadStart();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-body-sm font-medium">Upload File</label>
        <div className="border-2 border-dashed border-border-medium rounded-lg overflow-hidden">
          {previewUrl ? (
            <div className="relative aspect-square w-full">
              <Image
                src={previewUrl}
                alt="NFT Preview"
                fill
                className="object-contain"
              />
              <button
                type="button"
                className="absolute bottom-3 right-3 bg-background-primary/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-body-xs"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
              >
                Change
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-64 cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <ImagePlus className="h-12 w-12 text-text-tertiary mb-2" />
              <p className="text-body-sm text-text-secondary">Click to upload JPG, PNG, GIF</p>
              <p className="text-body-xs text-text-tertiary mt-1">Max size: 50MB</p>
            </label>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="name" className="block text-body-sm font-medium">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="NFT Name"
          className="w-full bg-background-secondary border border-border-medium rounded-lg py-2.5 px-3 text-body-sm placeholder:text-text-quaternary focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="block text-body-sm font-medium">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe your NFT"
          rows={3}
          className="w-full bg-background-secondary border border-border-medium rounded-lg py-2.5 px-3 text-body-sm placeholder:text-text-quaternary focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="price" className="block text-body-sm font-medium">Price (ETH)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="0.05"
            step="0.001"
            min="0"
            className="w-full bg-background-secondary border border-border-medium rounded-lg py-2.5 px-3 text-body-sm placeholder:text-text-quaternary focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="royalty" className="block text-body-sm font-medium">Royalty %</label>
          <input
            type="number"
            id="royalty"
            name="royalty"
            value={formData.royalty}
            onChange={handleInputChange}
            placeholder="10"
            min="0"
            max="20"
            className="w-full bg-background-secondary border border-border-medium rounded-lg py-2.5 px-3 text-body-sm placeholder:text-text-quaternary focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="collection" className="block text-body-sm font-medium">Collection</label>
        <select
          id="collection"
          name="collection"
          value={formData.collection}
          onChange={handleInputChange}
          className="w-full bg-background-secondary border border-border-medium rounded-lg py-2.5 px-3 text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="none">No Collection</option>
          <option value="create">Create New Collection</option>
        </select>
      </div>
      
      <div className="pt-4">
        <Button 
          type="submit" 
          variant="gradient" 
          className="w-full py-6"
        >
          Create NFT
        </Button>
        
        <div className="flex items-center gap-2 mt-4 p-3 bg-background-secondary rounded-lg">
          <AlertCircle className="h-5 w-5 text-warning-400 flex-shrink-0" />
          <p className="text-body-xs text-text-secondary">
            Gas fees will apply when creating this NFT. Make sure you have enough ETH in your wallet.
          </p>
        </div>
      </div>
    </form>
  );
}
