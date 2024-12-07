import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 *
 * when you access the Swagger UI at http://localhost:3000/api/v1/swagger,
 * you should be prompted for authentication
 * if the AuthGuard is implemented correctly.
 * If a user is not authenticated,
 * they will not be able to see or interact with the Swagger documentation.
 * */
export class AuthGuardSwagger implements CanActivate {
  //constructor(private readonly authService:AuthService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Extract JWT Token from headers
    const token = request.headers['authorization']?.split(' ')[1];

    if(!token) return false;

    // TODO
     return true;
    // Validate the token
    //return this.authService.validateToken(token);
  }
}
