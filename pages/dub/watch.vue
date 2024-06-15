<script lang="ts">
/**
 * Note: This file is just a redirect to the new URL format.
 * We used to support the format /dub/watch?s=s1&e=1
 * Now, we need to redirect browsers to the correct format.
 */

import Vue from 'vue';
import { goToGallery } from '~/utils/goToGallery';

export default Vue.extend({
  middleware: [
    function ({ redirect, route }) {
      if (route.query.s == null && route.query.e == null) {
        goToGallery(redirect);
      }

      let url = `/dub/${route.query.s}/${route.query.e}`;
      if (route.query.t) {
        url = `${url}?t=${route.query.t}`;
      }
      redirect(301, url);
    },
  ],
});
</script>
