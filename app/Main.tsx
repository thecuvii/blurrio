/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

"use client";

import { useQuery } from "@tanstack/react-query";
import prettyBytes from "pretty-bytes";

import { Copy, Loader, Upload } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ReactCompareSlider } from "react-compare-slider";
import Dropzone from "react-dropzone";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { generateImagePlaceholder } from "~/src/blur";

export function Main() {
  const [file, setFile] = useState<File | null>(null);
  const [previewDataURL, setPreviewDataURL] = useState<string | null>(null);

  // TODO edit the radius
  const [radius, setRadius] = useState(180);

  const onFileSelected = useCallback(
    (file: File) => {
      if (previewDataURL) URL.revokeObjectURL(previewDataURL);
      setFile(file);
      setPreviewDataURL(URL.createObjectURL(file));
    },
    [previewDataURL]
  );

  const { data: blurDataURL, isLoading } = useQuery({
    queryKey: [previewDataURL, radius],
    queryFn: () => generateImagePlaceholder(file!, radius),
    enabled: !!previewDataURL && !!file,
  });

  const loadedRef = useRef(false);
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    fetch("/example.jpg")
      .then((res) => res.blob())
      .then((blob) => new File([blob], "example.jpg"))
      .then(onFileSelected);
  }, [onFileSelected]);

  return (
    <main className="mx-4 mt-24">
      {previewDataURL ? (
        <ReactCompareSlider
          className="mx-auto max-w-[580px] rounded-sm"
          itemOne={<img className="w-full h-auto" src={previewDataURL} />}
          itemTwo={<img className="w-full h-auto" src={blurDataURL} />}
        />
      ) : (
        <Skeleton className="w-[580px] h-[400px] mx-auto rounded-lg" />
      )}

      {/* <section className="mt-4 flex gap-2 justify-center items-center">
        <Button variant={"outline"} className="rounded-full gap-1">
          {blurDataURL ? (
            <>
              <Copy className="size-4" />
              {blurDataURL ? prettyBytes(blurDataURL?.length) : ""}
            </>
          ) : (
            <Loader className={"size-4 animate-spin"} />
          )}
        </Button>
        <Dropzone
          onDrop={(acceptedFiles) => {
            onFileSelected(acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button className="rounded-full gap-1" size={"sm"}>
                  <Upload className="size-4" />
                  Upload
                </Button>
              </div>
            </section>
          )}
        </Dropzone>
      </section> */}
    </main>
  );
}
