import { getImageProps } from 'next/image';

type Props = {
  hell: string;
  dunkel?: string;
  alt: string;
  breite: number;
  hoehe: number;
  sizes: string;
  prioritaet?: boolean;
  className?: string;
};

/**
 * Screenshot aus der App (Demo-Daten). Mit `dunkel` wählt der Browser über
 * prefers-color-scheme die passende Fassung, ohne JavaScript.
 */
export function Screenshot({ hell, dunkel, alt, breite, hoehe, sizes, prioritaet, className }: Props) {
  const gemeinsam = { alt, width: breite, height: hoehe, sizes, quality: 80 };
  const {
    props: { srcSet: hellSet, ...rest }
  } = getImageProps({ ...gemeinsam, src: hell, priority: prioritaet });
  const dunkelSet = dunkel ? getImageProps({ ...gemeinsam, src: dunkel }).props.srcSet : undefined;

  return (
    <picture>
      {dunkelSet ? <source media="(prefers-color-scheme: dark)" srcSet={dunkelSet} sizes={sizes} /> : null}
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt steckt in rest */}
      <img
        {...rest}
        srcSet={hellSet}
        className={className}
        {...(prioritaet ? { fetchPriority: 'high' as const, loading: 'eager' as const } : {})}
      />
    </picture>
  );
}
