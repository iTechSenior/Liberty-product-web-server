import { Resolver, Mutation, Arg, ClassType, UseMiddleware } from 'type-graphql';
import { MiddlewareFn } from 'type-graphql';
export function createResolver<T extends ClassType, X extends ClassType>(suffix: string, returnType: T, inputType: X, entity: any, middleware?: MiddlewareFn<any>[]) {
  @Resolver()
  class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middleware || []))
    async create(
      @Arg('data', () => inputType)
      data: any
    ) {
      return entity.create(data).save();
    }
  }
  return BaseResolver;
}
