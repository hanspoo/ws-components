import { cleanupEmail, isValidEmail, mailer } from '@starter-ws/mail-utils';
import { genCodSeguridad } from '@starter-ws/shared';
import { dataSource } from '../data-source';
import { SolicitudAutenticarEmail } from '../entity/auth/solicitud-autenticar-email.entity';
import { Usuario } from '../entity/auth/usuario.entity';
import { logger } from '../utils/logger';

export type RegistrationServiceEmailStageResult = {
  success: boolean;
  msg: string;
};
export class RegistrationEmailStageService {
  cseg: number;
  constructor(public email: string) {}
  async execute(): Promise<RegistrationServiceEmailStageResult> {
    const e = cleanupEmail(this.email);
    if (!isValidEmail(e)) {
      return {
        success: false,
        msg: 'REG002: Email inválido',
      };
    }
    // const u = await dataSource
    //   .getRepository(Usuario)
    //   .findOne({ where: { email: e } });

    // if (u) {
    //   return {
    //     success: false,
    //     msg: "REG001: El usuario ya está registrado en el sistema ",
    //   };
    // }
    logger.debug(`Inicio: Salvando solicitud ${this.email}`);
    const repoSol = dataSource.getRepository(SolicitudAutenticarEmail);
    this.cseg = genCodSeguridad();
    await repoSol.save(repoSol.create({ email: this.email, cseg: this.cseg }));
    logger.debug(`Fin: Salvando solicitud ${this.email}`);
    logger.debug(`Inicio: Mandando email ${this.email}`);
    await this.enviarEmail();
    logger.debug(`Fin: Mandando email ${this.email}`);

    const res: RegistrationServiceEmailStageResult = {
      success: true,
      msg: '',
    };

    return Promise.resolve(res);
  }

  enviarEmail() {
    const transporter = mailer();

    const response = transporter.sendMail({
      from: '"Selección Superación Pobreza" <postseleccion@superacionpobreza.cl>', // sender address
      to: this.email,
      subject: 'Selección Superación Pobreza',
      html: `
<p>Estimado/a</p>

<p>Estamos comprobando que tu e-mail est&eacute; correcto. Para continuar ingresando tus datos, copia y pega el siguiente c&oacute;digo de confirmaci&oacute;n de seis d&iacute;gitos en tu formulario de postulaci&oacute;n; gracias.</p>

<h1>${this.cseg}</h1>

<p>Saludos cordiales,<br>
Direcci&oacute;n de Selecci&oacute;n y Desarrollo de Recursos Humanos</p>         

        `,
    });

    return response;
  }
}
