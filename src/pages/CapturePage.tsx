import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './CapturePage.module.css';

function InputField({
  label,
  value,
  onChange,
  locked,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  locked: boolean;
}) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <label className={styles.input}>
      <span>{label}</span>{' '}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        disabled={locked}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  locked,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  locked: boolean;
}) {
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value);
  }

  return (
    <label className={styles.input}>
      <span>{label}</span>{' '}
      <textarea value={value} onChange={handleChange} disabled={locked} />
    </label>
  );
}

function Button({
  label,
  onClick,
  locked,
}: {
  label: string;
  onClick: () => void;
  locked: boolean;
}) {
  return (
    <button className={styles.button} onClick={onClick} disabled={locked}>
      {label}
    </button>
  );
}

interface SavingStatus {
  type: 'new' | 'saving' | 'success' | 'error';
  msg?: string;
}

function Spinner() {
  return <div className={styles.spinner} />;
}

function Saving() {
  return (
    <p>
      <Spinner /> Saving...
    </p>
  );
}

function Saved() {
  return <p>✔️ Saved</p>;
}

function Failed({ msg }: { msg: string }) {
  return <p>❌ Failed ({msg})</p>;
}

function Status({ status }: { status: SavingStatus }) {
  switch (status.type) {
    case 'saving':
      return <Saving />;
    case 'success':
      return <Saved />;
    case 'error':
      return <Failed msg={status.msg || ''} />;
    default:
      return <p>&nbsp;</p>;
  }
}

export default function CapturePage() {
  const [searchParams] = useSearchParams();

  const [title, setTitle] = useState(searchParams.get('title') || '');
  const [url, setUrl] = useState(searchParams.get('url') || '');
  const [notes, setNotes] = useState(searchParams.get('notes') || '');

  const [savingStatus, setSavingStatus] = useState<SavingStatus>({
    type: 'new',
  });

  async function submit() {
    console.log(`Title: ${title}`);
    console.log(`URL: ${url}`);
    console.log(`Notes: ${notes}`);
    setSavingStatus({ type: 'saving' });
    await new Promise((r) => setTimeout(r, 2000));
    setSavingStatus({
      type: 'error',
      msg: 'This is a test of a somewhat long error message to see how it flows in the form.',
    });
  }

  function clear() {
    setSavingStatus({ type: 'new' });
  }

  const isSaving = () => savingStatus.type === 'saving';

  return (
    <div className={styles.form}>
      <h2>Capture</h2>
      <InputField
        label="Title"
        value={title}
        onChange={(x) => setTitle(x)}
        locked={isSaving()}
      />
      <InputField
        label="URL"
        value={url}
        onChange={(x) => setUrl(x)}
        locked={isSaving()}
      />
      <TextArea
        label="Notes"
        value={notes}
        onChange={(x) => setNotes(x)}
        locked={isSaving()}
      />
      <div>
        <Button label="Submit" onClick={submit} locked={isSaving()} />
        <Button label="Clear" onClick={clear} locked={isSaving()} />
        <Status status={savingStatus} />
      </div>
    </div>
  );
}
