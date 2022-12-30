import React from 'react';
import styles from './CapturePage.module.css';

function InputField({ label }: { label: string }) {
  return (
    <label className={styles.input}>
      <span>{label}</span> <input type="text" />
    </label>
  );
}

function TextArea({ label }: { label: string }) {
  return (
    <label className={styles.input}>
      <span>{label}</span> <textarea />
    </label>
  );
}

function Button({ label }: { label: string }) {
  return <button className={styles.button}>{label}</button>;
}

export default function CapturePage() {
  return (
    <div className={styles.form}>
      <h2>Capture</h2>
      <InputField label="Title" />
      <InputField label="URL" />
      <TextArea label="Notes" />
      <Button label="Submit" />
    </div>
  );
}
