import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

import { esgRatings } from './utils';

import type { ESGRating } from '@/types';
import { ESGBadge } from './esg-badge';

type Props = {
  sectors: string[];
  onApply: (filters: { sectors: string[]; esg: ESGRating[] }) => void;
};

export function FilterMenu({ sectors, onApply }: Props) {
  const [tempSectorFilters, setTempSectorFilters] = useState<string[]>([]);
  const [tempEsgFilters, setTempEsgFilters] = useState<ESGRating[]>([]);

  const handleClickApply = () => {
    onApply({ sectors: tempSectorFilters, esg: tempEsgFilters });
  };

  return (
    <>
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
                  <Label htmlFor={`sector-${sector}`} className="font-normal">
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
                  <Label htmlFor={`esg-${rating}`} className="flex items-center font-normal">
                    <ESGBadge rating={rating} />
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={handleClickApply} className="mt-4 w-full">
        Apply Filters
      </Button>
    </>
  );
}
