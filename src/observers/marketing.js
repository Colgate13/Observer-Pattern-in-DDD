export default class Marketing {
  update({ id, userName }) {
    // Importante lembrar que o update é responsavel por gerenciar seus erros/exceptions
    // nÃO DEVE CONTER AWAIT no notify porque a responsabilidade é so emitir eventos
    console.log(
      `[${id}]: [marketing] will send an wealcome email to [${userName}]`
    );
  }
}
