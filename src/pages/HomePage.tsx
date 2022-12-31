import React from 'react';

function bookmarklet() {
  return `javascript:location.href='${window.location.origin}/capture?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title)+'&notes='+encodeURIComponent(document.getSelection().toString())`;
}

export default function HomePage() {
  return (
    <div>
      <p>Add the following bookmarklet:</p>
      <p>
        <a href={bookmarklet()}>Capture</a>
      </p>
      <code>{bookmarklet()}</code>
    </div>
  );
}
