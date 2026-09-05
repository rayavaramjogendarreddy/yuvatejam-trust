"use client";

import React from "react";
import parse, { Element, domToReact, DOMNode } from "html-react-parser";
import { motion } from "framer-motion";
import Gallery, { GalleryItem } from "./Gallery";
import SafeImage from "@/components/ui/SafeImage";
import StatCard from "./StatCard";

interface ContentRendererProps {
  content: string;
}

function getNodeText(node: Element): string {
  if (!node || !node.children) return "";
  return node.children
    .map((child) => {
      if ("type" in child && child.type === "text" && "data" in child) {
        return (child as unknown as { data: string }).data || "";
      }
      if ("children" in child && (child as unknown as Element).children) {
        return getNodeText(child as unknown as Element);
      }
      return "";
    })
    .join("");
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  if (!content || !content.trim()) {
    return null;
  }

  // Pre-process HTML string to extract and group gallery items & clean HTML noise
  const cleanContent = content
    .replace(/<p>\s*(?:&nbsp;|\s)*\s*<\/p>/gi, "")
    .replace(/<h[1-6]>\s*(?:&nbsp;|\s)*\s*<\/h[1-6]>/gi, "")
    .replace(/<br\s*\/?>\s*<br\s*\/?>+/gi, "<br />");

  // Extract gallery figures into grouped blocks
  const galleryItemsList: GalleryItem[] = [];

  const galleryRegex = /<figure\b[^>]*class=['"][^'"]*gallery-item[^'"]*['"][^>]*>[\s\S]*?<img\b[^>]*src=['"]([^'"]+)['"][^>]*>[\s\S]*?<\/figure>/gi;
  let match;
  while ((match = galleryRegex.exec(cleanContent)) !== null) {
    const src = match[1];
    if (src && !galleryItemsList.some((item) => item.src === src)) {
      galleryItemsList.push({ src, alt: "Yuvatejam Initiative" });
    }
  }

  // Strip individual gallery figure markup so we can replace them with a unified <Gallery /> grid
  const contentWithoutFigures = cleanContent.replace(/<figure\b[^>]*class=['"][^'"]*gallery-item[^'"]*['"][^>]*>[\s\S]*?<\/figure>/gi, "");

  const options = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element) {
        if (domNode.name === "script" || domNode.name === "style" || domNode.name === "link") {
          return <React.Fragment />;
        }

        if (domNode.name === "h1") {
          return (
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight my-4">
              {domToReact(domNode.children as DOMNode[], options)}
            </h1>
          );
        }
        if (domNode.name === "h2") {
          return (
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight my-5 border-l-2 border-emerald-500/50 pl-3.5">
              {domToReact(domNode.children as DOMNode[], options)}
            </h2>
          );
        }
        if (domNode.name === "h3") {
          const textContent = getNodeText(domNode).trim();
          if (!textContent) return <React.Fragment />;
          return (
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight my-3">
              {domToReact(domNode.children as DOMNode[], options)}
            </h3>
          );
        }
        if (domNode.name === "h4" || domNode.name === "h5" || domNode.name === "h6") {
          const textContent = getNodeText(domNode).trim();
          if (!textContent) return <React.Fragment />;
          return (
            <h4 className="text-base font-semibold text-slate-800 my-2">
              {domToReact(domNode.children as DOMNode[], options)}
            </h4>
          );
        }

        if (domNode.name === "p") {
          const textContent = getNodeText(domNode).trim();
          if (!textContent || textContent === "&nbsp;") return <React.Fragment />;

          // Stat callout recognition
          if (/^\d+\s*%/i.test(textContent) || /^\d+\s*(?:Children|People|Women|Families|Centers|Schools)/i.test(textContent)) {
            const numMatch = textContent.match(/^(\d+(?:%|\+)?)\s*(.*)/);
            if (numMatch) {
              return (
                <StatCard
                  value={numMatch[1]}
                  label={numMatch[2]}
                  className="my-4 border-l-2 border-emerald-500/50"
                />
              );
            }
          }

          return (
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed my-3.5 font-normal">
              {domToReact(domNode.children as DOMNode[], options)}
            </p>
          );
        }

        if (domNode.name === "ul") {
          return (
            <ul className="space-y-2.5 my-4 pl-1">
              {domToReact(domNode.children as DOMNode[], options)}
            </ul>
          );
        }
        if (domNode.name === "ol") {
          return (
            <ol className="list-decimal list-inside space-y-2.5 my-4 text-slate-700 text-sm sm:text-base">
              {domToReact(domNode.children as DOMNode[], options)}
            </ol>
          );
        }
        if (domNode.name === "li") {
          const textContent = getNodeText(domNode).trim();
          if (!textContent) return <React.Fragment />;
          return (
            <li className="flex items-start space-x-2.5 text-slate-700 text-sm sm:text-base leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-2 flex-shrink-0" />
              <span>{domToReact(domNode.children as DOMNode[], options)}</span>
            </li>
          );
        }

        if (domNode.name === "img") {
          const src = domNode.attribs.src;
          const alt = domNode.attribs.alt || "Yuvatejam Trust Initiative";
          if (!src) return <React.Fragment />;

          if (src.includes("logo") || domNode.attribs.width === "150") {
            return (
              <div className="my-4 max-w-xs">
                <SafeImage
                  src={src}
                  alt={alt}
                  width={300}
                  height={200}
                  containerClassName="rounded-xl shadow-sm border border-slate-100 bg-slate-50"
                  className="object-contain"
                />
              </div>
            );
          }

          return (
            <div className="my-6">
              <SafeImage
                src={src}
                alt={alt}
                width={1200}
                height={675}
                containerClassName="rounded-2xl shadow-md border border-slate-100 bg-slate-100 max-h-[480px] w-full"
                className="object-cover w-full h-auto"
              />
            </div>
          );
        }

        if (domNode.name === "table") {
          return (
            <div className="my-6 w-full overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white p-2">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[480px]">
                {domToReact(domNode.children as DOMNode[], options)}
              </table>
            </div>
          );
        }

        if (domNode.name === "a") {
          const href = domNode.attribs.href;
          const textContent = getNodeText(domNode).trim();
          if (!textContent && !domNode.children.some((c) => c instanceof Element && c.name === "img")) {
            return <React.Fragment />;
          }
          if (href === "#" && !textContent) {
            return <React.Fragment />;
          }
        }
      }
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="prose max-w-none text-slate-700 leading-relaxed text-sm md:text-base space-y-4"
    >
      {parse(contentWithoutFigures, options)}

      {galleryItemsList.length > 0 && (
        <div className="pt-6 border-t border-slate-100">
          <Gallery items={galleryItemsList} title="Program Highlights & Media Gallery" />
        </div>
      )}
    </motion.div>
  );
}
