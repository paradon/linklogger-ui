import React, { useState, useEffect, Dispatch } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
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
    <div>
      <Spinner /> Saving...
    </div>
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

function Targets({
  target,
  setTarget,
}: {
  target: string;
  setTarget: Dispatch<string>;
}) {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/targets')
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`,
          );
        }
        return response.json();
      })
      .then((actualData) => setOptions(actualData))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <select value={target} onChange={(e) => setTarget(e.target.value)}>
      {options.map((x) => (
        <option value={x} key={x}>
          {x}
        </option>
      ))}
    </select>
  );
}

export default function CapturePage() {
  const [searchParams] = useSearchParams();

  const [title, setTitle] = useState<string>(searchParams.get('title') || '');
  const [url, setUrl] = useState<string>(searchParams.get('url') || '');
  const [notes, setNotes] = useState<string>(searchParams.get('notes') || '');
  const [target, setTarget] = useState<string>(
    searchParams.get('target') || '',
  );

  const [savingStatus, setSavingStatus] = useState<SavingStatus>({
    type: 'new',
  });

  async function submit() {
    console.log(`Title: ${title}`);
    console.log(`URL: ${url}`);
    console.log(`Notes: ${notes}`);
    setSavingStatus({ type: 'saving' });

    try {
      await axios.post('/api/capture', { title, url, notes, target });
      setSavingStatus({ type: 'success' });
    } catch (error) {
      setSavingStatus({
        type: 'error',
        msg: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  function clear() {
    setTitle('');
    setUrl('');
    setNotes('');
    setTarget('');
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
      <Targets target={target} setTarget={setTarget} />
      <div>
        <Button label="Submit" onClick={submit} locked={isSaving()} />
        <Button label="Clear" onClick={clear} locked={isSaving()} />
        <Status status={savingStatus} />
      </div>
    </div>
  );
}
