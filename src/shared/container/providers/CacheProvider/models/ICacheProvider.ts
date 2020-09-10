export default interface ICacheProvider {
  save(Key: string, value: any): Promise<void>;
  recover<T>(Key: string): Promise<T | null>;
  invalidate(Key: string): Promise<void>;
  invalidatePrefix(Key: string): Promise<void>;
}
