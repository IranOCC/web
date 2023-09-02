"use client";

import { RelatedTo } from "@/types/enum";
import { Estate } from "@/types/interfaces";
import React, { ReactNode } from "react";

type SubTitleType = {
  type: "page" | "blog" | "estate";
  //
  category?: string;
  author?: string;
  publishedAt?: Date;
  //
  rating?: boolean;
  sharing?: boolean;
  report?: boolean;
  //
  rateScore?: number;
  userRate?: number;
  //
  code?: string;
  location?: string;
};

export type WebPreviewContextType = {
  isFullscreen: boolean;
  toggleFullscreen: () => void;

  background: string;
  setBackground: (n: string) => void;

  isFullContent: boolean;
  toggleFullContent: () => void;

  contactModalOpen: boolean;
  setContactModalOpen: (n: boolean) => void;

  breadCrump?: { title: string; url?: string }[];
  setBreadCrump: (n?: { title: string; url?: string }[] | undefined) => void;

  sidebar?: { small: boolean; props?: {}; component: string };
  setSidebar: (n?: { small: boolean; props?: {}; component: string } | undefined) => void;

  headerTitle?: string;
  setHeaderTitle: (n?: string) => void;

  headerSubTitle?: SubTitleType;
  setHeaderSubTitle: (n?: SubTitleType) => void;

  relatedTo?: RelatedTo;
  relatedToID?: string;

  singlePost: (id: string, title: string, categories: string[], author: string, publishedAt: Date, rateScore: number, userRate?: number) => void;
  singlePage: (id: string, title: string, publishedAt: Date, rateScore: number, userRate?: number) => void;
  singleEstate: (id: string, title: string, category: string, province: string, city: string, district: string, code?: string) => void;
  errorPage: () => void;
  searchPage: () => void;
  blogPage: () => void;
  internalPage: () => void;
};

export const WebPreviewContext = React.createContext<WebPreviewContextType | null>(null);

export const WebPreviewProvider = ({ children, initial }: { children: ReactNode; initial?: { full: boolean } }) => {
  const [isFullscreen, setFullscreen] = React.useState<boolean>(initial?.full || false);
  const [background, setBackground] = React.useState<string>("bg-white");
  const [breadCrump, setBreadCrump] = React.useState<{ title: string; url?: string }[] | undefined>(undefined);
  const [sidebar, setSidebar] = React.useState<{ small: boolean; props?: {}; component: string } | undefined>(undefined);
  const [isFullContent, setFullContent] = React.useState<boolean>(false);
  const [headerTitle, setHeaderTitle] = React.useState<string | undefined>(undefined);
  const [headerSubTitle, setHeaderSubTitle] = React.useState<SubTitleType | undefined>(undefined);
  const [relatedTo, setRelatedTo] = React.useState<RelatedTo | undefined>(undefined);
  const [relatedToID, setRelatedToID] = React.useState<string | undefined>(undefined);

  const [contactModalOpen, setContactModalOpen] = React.useState<boolean>(false);

  const toggleFullscreen = () => {
    setFullscreen((prev) => !prev);
  };
  const toggleFullContent = () => {
    setFullContent((prev) => !prev);
  };

  // singlePost
  const singlePost = (id: string, title: string, categories: string[], author: string, publishedAt: Date, rateScore: number, userRate?: number) => {
    setBackground("bg-white");
    setHeaderTitle(title);
    setRelatedTo(RelatedTo.Blog);
    setRelatedToID(id);
    setBreadCrump([
      //
      { title: "ایران اکازیون", url: "/" },
      { title: "وبلاگ" },
      { title: categories[0] },
    ]);
    setFullContent(false);
    setSidebar({
      small: true,
      props: { id },
      component: "Features/Blog/RelatedBlogs",
    });
    setHeaderSubTitle({
      type: "blog",
      category: categories.join("، "),
      author,
      publishedAt,
      //
      rating: true,
      sharing: true,
      report: true,
      //
      rateScore,
      userRate,
    });
  };
  // singlePost
  const singlePage = (id: string, title: string, publishedAt: Date) => {
    setBackground("bg-white");
    setHeaderTitle(title);
    setRelatedTo(RelatedTo.Page);
    setRelatedToID(id);
    setBreadCrump(undefined);
    setFullContent(false);
    setSidebar({
      small: true,
      props: { id },
      component: "Features/Blog/RelatedBlogs",
    });
    setHeaderSubTitle({
      type: "page",
      publishedAt,
      //
      rating: false,
      sharing: true,
      report: true,
    });
  };
  // singleEstate
  const singleEstate = (id: string, title: string, category: string, province: string, city: string, district: string, code?: string) => {
    setBackground("bg-white");
    setHeaderTitle(title);
    setRelatedTo(RelatedTo.Property);
    setRelatedToID(id);
    setBreadCrump([
      //
      { title: "ایران اکازیون", url: "/" },
      { title: category },
      { title: city },
    ]);
    setFullContent(false);
    setSidebar({
      small: false,
      props: { id },
      component: "Features/Estate/MapEstate",
    });
    setHeaderSubTitle({
      type: "estate",
      code,
      location: [province, city, district].join(" - "),
    });
  };
  // errorPage
  const errorPage = () => {
    setBackground("bg-secondary");
    setHeaderTitle(undefined);
    setRelatedTo(undefined);
    setRelatedToID(undefined);
    setBreadCrump(undefined);
    setFullContent(true);
    setSidebar(undefined);
    setHeaderSubTitle(undefined);
  };
  // searchPage
  const searchPage = () => {
    setBackground("bg-white");
    setHeaderTitle(undefined);
    setRelatedTo(undefined);
    setRelatedToID(undefined);
    setBreadCrump(undefined);
    setFullContent(false);
    setSidebar(undefined);

    // setSidebar({
    //   small: false,
    //   props: {},
    //   component: "Features/Estate/MapEstate",
    // });
    setHeaderSubTitle(undefined);
  };

  // internalPage
  const internalPage = () => {
    setBackground("bg-white");
    setHeaderTitle(undefined);
    setRelatedTo(undefined);
    setRelatedToID(undefined);
    setBreadCrump(undefined);
    setFullContent(false);
    setSidebar(undefined);
    setHeaderSubTitle(undefined);
  };

  // blogPage
  const blogPage = () => {
    setBackground("bg-white");
    setHeaderTitle(undefined);
    setRelatedTo(undefined);
    setRelatedToID(undefined);
    setBreadCrump(undefined);
    setFullContent(false);
    setSidebar(undefined);
    setHeaderSubTitle(undefined);
  };

  return (
    <WebPreviewContext.Provider
      value={{
        isFullscreen,
        toggleFullscreen,
        isFullContent,
        toggleFullContent,
        background,
        setBackground,
        breadCrump,
        setBreadCrump,
        sidebar,
        setSidebar,
        headerTitle,
        setHeaderTitle,
        headerSubTitle,
        setHeaderSubTitle,
        //
        singlePost,
        singlePage,
        singleEstate,
        errorPage,
        searchPage,
        blogPage,
        internalPage,
        relatedTo,
        relatedToID,
        //
        contactModalOpen,
        setContactModalOpen,
      }}
    >
      {children}
      {/*  */}
    </WebPreviewContext.Provider>
  );
};
