import { Link } from "react-router-dom";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import atomOneDark from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark";
import atomOneLight from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-light";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageLayout from "@/components/page-layout";
import { useTheme } from "next-themes";

SyntaxHighlighter.registerLanguage("javascript", js);

export default function DocsPage() {
  const { theme } = useTheme();
  const public_baseurl = process.env.NEXT_PUBLIC_APP_URL;
  const codeTheme = theme === "light" ? atomOneLight : atomOneDark;
  const backgroundColor = theme === "dark" ? "#161616" : "#fafafa";

  return (
    <PageLayout title="Docs" subtitle="Uploadnest API Documentation">
      <div className="mx-auto px-1">
        <div className="mb-8">
          <h2 className="text-lg font-semibold">TypeScript/JavaScript SDK</h2>
          <p className="text-sm text-muted-foreground mb-6">
            TypeScript library for uploading files to Uploadnest API. Works in
            Node.js, Next.js, and browsers. Remember to create your API key on
            your{" "}
            <Link
              href="/api-keys"
              className="text-primary underline"
            >
              API Keys page
            </Link>
            .
          </p>

          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border">
                <SyntaxHighlighter
                  language=""
                  style={codeTheme}
                  customStyle={{
                    background: backgroundColor,
                  }}
                >
                  {"npm install @uploadnest/client"}
                </SyntaxHighlighter>
              </div>
            </CardContent>
          </Card>

          {/* Rest of the documentation content */}
        </div>
      </div>
    </PageLayout>
  );
}