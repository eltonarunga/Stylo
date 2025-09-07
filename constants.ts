import type { ClothingStyle, AspectRatio, BackgroundStyle } from './types';
import { SweaterIcon } from './components/icons/styles/SweaterIcon';
import { SuitIcon } from './components/icons/styles/SuitIcon';
import { JacketIcon } from './components/icons/styles/JacketIcon';
import { HoodieIcon } from './components/icons/styles/HoodieIcon';
import { ShirtIcon } from './components/icons/styles/ShirtIcon';
import { TurtleneckIcon } from './components/icons/styles/TurtleneckIcon';
import { BlazerIcon } from './components/icons/styles/BlazerIcon';
import { BlouseIcon } from './components/icons/styles/BlouseIcon';
import { PoloIcon } from './components/icons/styles/PoloIcon';
import { TweedIcon } from './components/icons/styles/TweedIcon';
import { ScrubsIcon } from './components/icons/styles/ScrubsIcon';
import { PilotIcon } from './components/icons/styles/PilotIcon';
import { StudioIcon } from './components/icons/backgrounds/StudioIcon';
import { OfficeIcon } from './components/icons/backgrounds/OfficeIcon';
import { CityscapeIcon } from './components/icons/backgrounds/CityscapeIcon';
import { GradientIcon } from './components/icons/backgrounds/GradientIcon';
import { WallIcon } from './components/icons/backgrounds/WallIcon';

export const CLOTHING_STYLES: ClothingStyle[] = [
  { name: 'Purple Sweater', icon: SweaterIcon },
  { name: 'Black Suit', icon: SuitIcon },
  { name: 'Blue Jacket', icon: JacketIcon },
  { name: 'Tech Hoodie', icon: HoodieIcon },
  { name: 'Crisp White Shirt', icon: ShirtIcon },
  { name: 'Turtleneck', icon: TurtleneckIcon },
  { name: 'Gray Blazer', icon: BlazerIcon },
  { name: 'Navy Blue Blouse', icon: BlouseIcon },
  { name: 'Business Casual Polo', icon: PoloIcon },
  { name: 'Tweed Jacket', icon: TweedIcon },
  { name: 'Surgical Scrubs', icon: ScrubsIcon },
  { name: 'Pilot Uniform', icon: PilotIcon },
];

export const ASPECT_RATIOS: AspectRatio[] = [
  { name: 'Square (1:1)', value: '1:1' },
  { name: 'Portrait (4:5)', value: '4:5' },
  { name: 'Story (9:16)', value: '9:16' },
];

export const BACKGROUND_STYLES: BackgroundStyle[] = [
  { name: 'Studio Backdrop', icon: StudioIcon },
  { name: 'Office Environment', icon: OfficeIcon },
  { name: 'Outdoor Cityscape', icon: CityscapeIcon },
  { name: 'Abstract Gradient', icon: GradientIcon },
  { name: 'Minimalist Wall', icon: WallIcon },
];
