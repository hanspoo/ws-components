const tipos: Record<string, string> = {
  image: 'fa-file-image',
  audio: 'fa-file-audio',
  video: 'fa-file-video',
  'application/pdf': 'fa-file-pdf',
  'application/msword': 'fa-file-word',
  'application/vnd.ms-word': 'fa-file-word',
  'application/vnd.oasis.opendocument.text': 'fa-file-word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml':
    'fa-file-word',
  'application/vnd.ms-excel': 'fa-file-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml':
    'fa-file-excel',
  'application/vnd.oasis.opendocument.spreadsheet': 'fa-file-excel',
  'application/vnd.ms-powerpoint': 'fa-file-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml':
    'fa-file-powerpoint',
  'application/vnd.oasis.opendocument.presentation': 'fa-file-powerpoint',
  'text/plain': 'fa-file-text',
  'text/html': 'fa-file-code',
  'application/json': 'fa-file-code',
  'application/gzip': 'fa-file-archive',
  'application/zip': 'fa-file-archive',
};

export function classForMime(mime_type: string): string {
  const e = tipos[mime_type];
  const o = Object.keys(tipos).find((t) => mime_type.startsWith(t));
  if (o) return tipos[o];
  return e || 'fa-file';
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB',
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
