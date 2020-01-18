import { ExploreModel } from './explore.model';

export interface ProviderModel {
    title: string;
    provider: string;
    explore: ExploreModel;
}