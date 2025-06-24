import "../public/css/font-awesome/css/font-awesome.min.css"
import "../public/css/style.css"
import { PedidoProvider } from "./context/pedidoContext";

export const metadata = {
  title: "Prova PFS2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <PedidoProvider>
          {children}
        </PedidoProvider>

        <script src="/js/vendor.bundle.base.js"></script>
        <script src="/js/hoverable-collapse.js"></script>
        <script src="/js/off-canvas.js"></script>
        <script src="/js/settings.js"></script>
        <script src="/js/template.js"></script>
      </body>
    </html>
  );
}
