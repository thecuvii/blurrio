import { getHighlighter } from "shiki";

export const Code = async () => {
  const highlighter = await getHighlighter({
    themes: ["vitesse-light"],
    langs: ["typescript"],
  });

  const code = highlighter.codeToHtml(
    `import { generate } from 'blurrio'

// runs in browser, returns a base64 string
const blur = await generate(file, 180)

<img src={blur}/>`,
    {
      lang: "typescript",
      theme: "vitesse-light",
    }
  );

  return <div dangerouslySetInnerHTML={{__html:code}} />;
};
