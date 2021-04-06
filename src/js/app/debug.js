
/**
 * Dump all elements causing unintended body overflow.
 *
 * Cf. https://css-tricks.com/findingfixing-unintended-body-overflow/
 */
export function getBodyOverflow() {

  const docWidth = document.documentElement.offsetWidth;

  [].forEach.call(
  
    document.querySelectorAll('*'),
  
    function(el) {
  
      if (el.offsetWidth > docWidth) {
  
        console.log(el);
      }
    }
  );
}