import styles from './fader.module.css';

/* eslint-disable-next-line */
export interface FaderProps {
  children: React.ReactNode;
  seconds?: number;
}

/**
 *
 * @param props Show the children justo for n seconds with a fade in - fade out effect.
 * @returns
 */
export function Fader({ seconds = 3, children }: FaderProps) {
  return <div className={styles['fader']}>{children}</div>;
}

export default Fader;
