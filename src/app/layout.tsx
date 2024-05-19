import './globals.css';

export const metadata = {
  title: 'かんたんマークダウンくん（仮）',
  description: 'マークダウンファイルの作成・編集・保存ができるソフトウェア',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}