import { Injectable } from '@nestjs/common';
import { DefaultSessionSerializer } from 'nestjs-session-auth';

/**
 * Session serializer — delegates to the library's DefaultSessionSerializer
 * which stores the full user object in the session.
 *
 * To override (e.g. serialize only ID), extend PassportSerializer directly.
 */
@Injectable()
export class SessionSerializer extends DefaultSessionSerializer {}
