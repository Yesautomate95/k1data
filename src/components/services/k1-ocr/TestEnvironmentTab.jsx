"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import WagesTable from "./K1Table";

import ComparisonView from "@/components/ComparisonView/ComparisonView";

export default function TestEnvironmentTab() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleUpload = async () => {
    console.log("Uploading files...");
    if (!file) {
      toast.error("Please select a divident OCR image");
      return;
    }

    setPreviewUrl(null);
    setFileName(null);
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await fetch("/api/services/k1-ocr", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.error?.message) {
          toast.error(data?.error?.message);
          return;
        }

        toast.error(data?.error?.errors?.document);
        return;
      }

      setResponse(data);
      toast.success("Upload successful!");
      setPreviewUrl(URL.createObjectURL(file));
      setFileName(file.name);
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between   p-4">
      <Card className="w-full max-w-lg shadow-none border-0">
        <CardHeader>
          <CardTitle>Upload K1 OCR</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="front">K1 Image</Label>
            <Input
              id="front"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <Button onClick={handleUpload} disabled={loading} className="w-full">
            {loading ? "Uploading..." : "Upload"}
          </Button>
          {previewUrl && (
            <ComparisonView
              previewUrl={previewUrl}
              TableComponent={WagesTable}
              tableData={response?.output}
              fileName={fileName}
            />
          )}
        </CardContent>
      </Card>
      <WagesTable data={response?.output} />
    </div>
  );
}
