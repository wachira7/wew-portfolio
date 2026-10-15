import StatusPage from '@/components/ui/status-page';

export default function NotFound() {
  return (
    <StatusPage
      code="cd ./this-page  # 404: no such file or directory"
      title={
        <>
          This page doesn&apos;t exist<span className="text-accent">.</span>
        </>
      }
    >
      The link may be old, or the page may have moved. Everything that does exist is one click away.
    </StatusPage>
  );
}
