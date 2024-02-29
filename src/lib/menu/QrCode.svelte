<script lang="ts">
  import { QRCodeSVG } from '@akamfoad/qrcode';

  export let data: string;

  $: xmlWithQRCode = new QRCodeSVG(data).toString();
</script>

<div>
  {@html xmlWithQRCode}
</div>
