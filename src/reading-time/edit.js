import { useSelect } from '@wordpress/data';
import { _n, sprintf, __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object} props - Block props
 * @param {Object} props.attributes - Block attributes
 * @param {Function} props.setAttributes - Function to update attributes
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
  const { prefix } = attributes;
  
  const { minutes } = useSelect( select => {
    const store = select( "yoast-seo/editor" );
  
     return {
       minutes: store?.getEstimatedReadingTime() ?? 42,
     };
  }, [] );
  
  const minutesText = sprintf( _n( '%1$s minute', '%1$s minutes', minutes, 'reading-time'), minutes );
  const placeholder = __( 'Estimated reading time:', 'reading-time' );
  
  return (
    <p { …useBlockProps() }>
      <RichText
        tagName=“span”
        value={prefix}
        onChange={(value) => setAttributes({ prefix: value })}
        placeholder={placeholder}
        allowedFormats={[]}
        className=“reading-time-prefix”
      />
      { prefix && ’ ' }
      { minutesText }
    </p>
  );
}
