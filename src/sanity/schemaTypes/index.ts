import { type SchemaTypeDefinition } from 'sanity'
import creation from '../schemas/creation'
import gallery from '../schemas/gallery'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [creation,gallery],
}
