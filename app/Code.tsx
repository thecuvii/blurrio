import { getHighlighter } from "shiki";

export const Code = async () => {
  const highlighter = await getHighlighter({
    themes: ["vitesse-light"],
    langs: ["typescript"],
  });

  const code = highlighter.codeToHtml("import { generate } from 'blurrio'\n\nconst blur = await generate(file, 180)", {
    lang: "typescript",
    theme: "vitesse-light",
  });

  return <div dangerouslySetInnerHTML={{__html:code}} />;
};
