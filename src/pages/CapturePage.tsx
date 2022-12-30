import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './CapturePage.module.css';

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <label className={styles.input}>
      <span>{label}</span>{' '}
      <input type="text" value={value} onChange={handleChange} />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value);
  }

  return (
    <label className={styles.input}>
      <span>{label}</span>{' '}
      <textarea value={value} onChange={handleChange}></textarea>
    </label>
  );
}

function Button({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
}

export default function CapturePage() {
  const [searchParams] = useSearchParams();

  const [title, setTitle] = useState(searchParams.get('title') || '');
  const [url, setUrl] = useState(searchParams.get('url') || '');
  const [notes, setNotes] = useState(searchParams.get('notes') || '');

  function submit() {
    console.log(`Title: ${title}`);
    console.log(`URL: ${url}`);
    console.log(`Notes: ${notes}`);
  }

  return (
    <div className={styles.form}>
      <h2>Capture</h2>
      <InputField label="Title" value={title} onChange={(x) => setTitle(x)} />
      <InputField label="URL" value={url} onChange={(x) => setUrl(x)} />
      <TextArea label="Notes" value={notes} onChange={(x) => setNotes(x)} />
      <Button label="Submit" onClick={submit} />
    </div>
  );
}
