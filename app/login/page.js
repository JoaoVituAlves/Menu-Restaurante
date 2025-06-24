

export default function LoginPage() {
    return (
        <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <h2>Bem vindo!</h2>
                <h6 className="fw-light">Faça o login abaixo:</h6>
                <form className="pt-3">
                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg"  placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg"  placeholder="Senha" />
                  </div>
                  <div className="mt-3 d-grid gap-2">
                    <a className="btn btn-block btn-primary btn-lg fw-medium auth-form-btn">Entrar</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}