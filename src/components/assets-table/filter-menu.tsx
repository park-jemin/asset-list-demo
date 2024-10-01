import { type ReactNode, useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PopoverClose, PopoverContent } from '@/components/ui/popover';
import { useMediaQuery } from '@/hooks/use-media-query';

import { ESGBadge } from './esg-badge';
import { esgRatings } from './utils';

import type { ESGRating } from '@/types';

type Props = {
  className?: string;
  sectors: string[];
  onApply: (filters: { sectors: string[]; esg: ESGRating[] }) => void;
};

function Positioning({ className, children }: { className?: string; children: ReactNode }) {
  const isEndAligned = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
  const alignment = isEndAligned ? 'end' : 'center';
  return (
    <PopoverContent className={className} align={alignment}>
      {children}
    </PopoverContent>
  );
}

export function FilterMenu({ sectors, onApply, className }: Props) {
  const [tempSectorFilters, setTempSectorFilters] = useState<string[]>([]);
  const [tempEsgFilters, setTempEsgFilters] = useState<ESGRating[]>([]);

  const handleClickApply = () => {
    onApply({ sectors: tempSectorFilters, esg: tempEsgFilters });
  };

  return (
    <Positioning className={className}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="sectors">
          <AccordionTrigger>Sectors</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {sectors.map((sector) => (
                <div key={sector} className="flex items-center space-x-2">
                  <Checkbox
                    id={`sector-${sector}`}
                    checked={tempSectorFilters.includes(sector)}
                    onCheckedChange={(checked) => {
                      setTempSectorFilters(
                        checked
                          ? [...tempSectorFilters, sector]
                          : tempSectorFilters.filter((s) => s !== sector)
                      );
                    }}
                  />
                  <Label htmlFor={`sector-${sector}`} className="py-1 font-normal">
                    {sector}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="esg">
          <AccordionTrigger>ESG Ratings</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {esgRatings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`esg-${rating}`}
                    checked={tempEsgFilters.includes(rating)}
                    onCheckedChange={(checked) => {
                      setTempEsgFilters(
                        checked
                          ? [...tempEsgFilters, rating]
                          : tempEsgFilters.filter((r) => r !== rating)
                      );
                    }}
                  />
                  <Label htmlFor={`esg-${rating}`} className="flex items-center py-1 font-normal">
                    <ESGBadge rating={rating} />
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <PopoverClose asChild>
        <Button onClick={handleClickApply} className="mt-4 w-full">
          Apply Filters
        </Button>
      </PopoverClose>
    </Positioning>
  );
}
